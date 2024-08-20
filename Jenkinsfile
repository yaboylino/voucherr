library 'common'

loadSharedEnvironment();

pipeline {
    agent {
        label 'docker'
    }

    environment {
        BUILD_ENVIRONMENT = 1
    }

    stages {
        stage ('build theme') {
            agent{
                docker {
                    image 'registry.hub.docker.com/library/maven:3.8-openjdk-17'
                }
            }

            steps {
                sh 'cd theme && mkdir -p ../providers && jar cf ../providers/nedbase-theme.jar ./META-INF ./theme pom.xml'
                stash includes: 'providers/nedbase-theme.jar', name: 'theme-provider'
            }
        }

        stage ('build scripts') {
            agent{
                docker {
                    image 'registry.hub.docker.com/library/maven:3.8-openjdk-17'
                }
            }

            steps {
                sh 'cd scripts && jar cf ../providers/nedbase-scripts.jar ./*'
                stash includes: 'providers/nedbase-scripts.jar', name: 'scripts-provider'
            }
        }

        stage ('create image') {
            agent any

            steps {
                unstash 'theme-provider'
                unstash 'scripts-provider'
                script {
                    docker.withRegistry('https://harbor.local.nedbase.net', 'harbor-local') {
                        def image = docker.build('mijnnb/keycloak:'+ env.BRANCH_NAME.replaceAll('/','_')+ '-' + env.BUILD_ID, '  -f Dockerfile ./')
                        image.push();

                        if('main' == env.BRANCH_NAME) {
                            image.push('latest');
                        }

                        if(env.TAG_NAME != null) {
                            image.push(env.BRANCH_NAME);
                        }
                    }
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
