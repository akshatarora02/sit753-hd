pipeline {
  agent any
  environment {
        dockerImageUri = 'akshatarora/video-streaming' // Docker image URI
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
                    sh "/opt/homebrew/bin/aws deploy create-deployment --application-name video-streaming --deployment-group-name sit753-videostreaming --revision revisionType=Docker,imageName=akshatarora/video-streaming:latest"
                    sh "/opt/homebrew/bin/aws deploy create-deployment --application-name history --deployment-group-name history --revision revisionType=AppSpecContent,content='{\"docker\": {\"imageUri\": \"${dockerImageUri}\"}}'"
                    // Add more deployment commands for additional Docker images as needed
                }
            }
        }

}
}