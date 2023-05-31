pipeline {
  agent any
  
  stages {
    stage('Build') {
      steps {
        
        sh 'docker build -t video-streaming -f video-streaming/Dockerfile video-streaming/.'
        sh 'docker build -t history -f history/Dockerfile history/.'
        
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
    stage('Deploy') {
      steps {
        
        sh 'docker compose up'
        
      }
    }
}
}