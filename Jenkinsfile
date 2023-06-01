pipeline {
  agent any
  environment {
        RECIPIENT_EMAIL = 'akshatarora028@gmail.com'
    }

  stages {
    stage('Build') {
      steps {
        
        sh '''
            docker buildx create --use
            docker buildx build --push --platform linux/amd64,linux/arm64 -t akshatarora/video-streaming -f video-streaming/Dockerfile video-streaming/. 
            docker buildx build --push --platform linux/amd64,linux/arm64 -t akshatarora/history -f history/Dockerfile history/. 
            '''
      }
    }
    
    stage('Test') {
      steps {
        // Running automated tests using mocha and supertest
        sh '''
                cd video-streaming/
                npm install
                npm test
            '''
      }
    }
    
    stage('Code Quality Check') {
      steps {
        // Run SonarQube analysis
        withSonarQubeEnv(installationName: 'sonar') {
          sh '/opt/homebrew/bin/sonar-scanner'
        }
      }
    }
    stage('Deploy to Development') {
      steps {
        
        sh 'docker compose up -d'
        
      }
    }
    stage('Deploy to Production') {
            steps {
                withAWS(credentials: 'd7b824d2-580f-4ff2-9f43-b0d6d7b68e41', region: 'ap-southeast-2') {
                    sh "/opt/homebrew/bin/aws deploy create-deployment --application-name video-streaming --deployment-config-name CodeDeployDefault.AllAtOnce --deployment-group-name sit753-videostreaming --github-location repository=akshatarora02/sit753-hd,commitId=7f9d24b7a79fd0693c803ab86283a4390b922617"
                    // Add more deployment commands for additional Docker images as needed
                }
            }
        }
    // stage('Install and Start Datadog Agent') {
    //         steps {
    //             withCredentials([string(credentialsId: 'datadog-api-key', variable: 'DATADOG_API_KEY')]) {
    //             sh 'DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=${DATADOG_API_KEY} DD_SITE="datadoghq.com" bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"'
    //             }
    //             sh 'sudo systemctl start datadog-agent'
    //         }
    //     }
    stage('Create or Update Datadog Monitor') {
            steps {
                script {
                    def monitorPayload = [
                        'type': 'metric alert',
                        'query': 'avg(last_5m):avg:system.load.1{host:ip-172-31-12-149.ap-southeast-2.compute.internal} by {host} > 0.1',
                        'name': 'High CPU Usage',
                        'message': 'High CPU usage detected on instance',
                        'tags': ['env:production'],
                        'options': [
                            'notify_audit': false,
                            'notify_no_data': false,
                            'timeout_h': 0,
                            'include_tags': true,
                            'require_full_window': false,
                            'notify_email': [
                                'addresses': ['akshatarora028@gmail.com']
                            ]
                        ]
                    ]
                    
                    // Send the monitor payload to Datadog API to create or update the monitor
                    withCredentials([string(credentialsId: 'datadog-api-key', variable: 'DATADOG_API_KEY')]) {
                    sh """
                        curl -X POST "https://api.datadoghq.com/api/v1/monitor?api_key=${DATADOG_API_KEY}" \\
                        -H "Content-Type: application/json" \\
                        -d '${monitorPayload}'
                    """
                    }
                }
            }
        }
    }
}
