#!/bin/sh

################################################################################
# This program and the accompanying materials are made available under the terms of the
# Eclipse Public License v2.0 which accompanies this distribution, and is available at
# https://www.eclipse.org/legal/epl-v20.html
#
# SPDX-License-Identifier: EPL-2.0
#
# Copyright IBM Corporation 2020
################################################################################

echo 'sample-trial-app configure begin'

COMPONENT_DIR=$(dirname "${LAUNCH_COMPONENT}")
echo "COMPONENT_DIR: ${COMPONENT_DIR}"

echo 'install app with zowe desktop'
${INSTANCE_DIR}/bin/install-app.sh ${COMPONENT_DIR}

echo 'sample-trial-app configure done'