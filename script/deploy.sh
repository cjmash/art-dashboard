#!/usr/bin/env bash
set -eo pipefail

DEPLOY_SCRIPT_PATH="${HOME}/deploy"

curl -o $DEPLOY_SCRIPT_PATH https://raw.githubusercontent.com/AndelaOSP/bash-helper-modules/master/k8s/deploy

source $DEPLOY_SCRIPT_PATH

DOCKER_REGISTRY=gcr.io
GCLOUD_SERVICE_KEY_NAME=gcloud-service-key.json
ALLOWED_DEPLOY_ENVIRONMENTS=('staging', 'production')

require 'PRODUCTION_GOOGLE_COMPUTE_ZONE' $PRODUCTION_GOOGLE_COMPUTE_ZONE
require 'STAGING_GOOGLE_COMPUTE_ZONE' $STAGING_GOOGLE_COMPUTE_ZONE
require 'STAGING_CLUSTER_NAME' $STAGING_CLUSTER_NAME
require 'PRODUCTION_CLUSTER_NAME' $PRODUCTION_CLUSTER_NAME
require 'PROJECT_NAME' $PROJECT_NAME
require 'GOOGLE_PROJECT_ID' $GOOGLE_PROJECT_ID
require 'DOCKER_REGISTRY' $DOCKER_REGISTRY
require 'GCLOUD_SERVICE_KEY' $GCLOUD_SERVICE_KEY

export REACT_APP_API_URL=https://api-staging-art.andela.com/api/v1/
export REACT_APP_FIREBASE_KEY=AIzaSyAJCRcTGOgHcr53wWQU4RtRWp7yQlUEevM
export REACT_APP_AUTH_DOMAIN=andela-resource-tracker.firebaseapp.com
export REACT_APP_DATABASE_URL=andela-resource-tracker.firebaseio.com
export REACT_APP_PROJECT_ID=andela-resource-tracker
export REACT_APP_STORAGE_BUCKET=andela-resource-tracker.appspot.com
export REACT_APP_MESSAGING_SENDER_ID=236168090156

if [ "$CIRCLE_BRANCH" == "master" ]; then
   export REACT_APP_API_URL=https://api-art.andela.com/api/v1/
fi
echo $EACT_APP_API_URL
yarn build

authorize_docker() {
    echo "====> Store Sand authenticate with service account"
    echo $GCLOUD_SERVICE_KEY | base64 --decode > ${HOME}/gcloud-service-key.json

    echo "====> Login to docker registry"


    docker login -u _json_key -p "$(cat ${HOME}/gcloud-service-key.json)" https://gcr.io
}

BRANCH_NAME=$CIRCLE_BRANCH
# set the deployment environment
setEnvironment $BRANCH_NAME
# ensure its an allowed deployment environment
isAllowedDeployEnvironment $ENVIRONMENT
# get K8s deployment name


getDeploymentName DEPLOYMENT_NAME

# Set image image tag and name
IMAGE_TAG=$(getImageTag $(getCommitHash))
IMAGE_NAME=$(getImageName)

main() {
    installGoogleCloudSdk
    authWithServiceAccount
    configureGoogleCloudSdk
    authorize_docker
    buildAndTagDockerImage .
    publishDockerImage
    logoutContainerRegistry $DOCKER_REGISTRY
    deployToKubernetesCluster frontend
}

main
