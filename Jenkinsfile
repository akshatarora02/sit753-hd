pipeline {
  agent any
  tools {
    nodejs 'node'
  }
  
  stages {
    stage('Build') {
      steps {
        
        sh 'docker build -t video-streaming -f video-streaming/Dockerfile .'
        sh 'docker build -t history -f history/Dockerfile .'
        
      }
    }
    
    stage('Test') {
      steps {
        // Running automated tests using mocha and supertest
        sh 'cd video-streaming/'
        sh 'npm install'
        sh 'npm test'
      }
    }
    
    stage('Code Quality Check') {
      steps {
        // Run SonarQube analysis
        withSonarQubeEnv(installationName: 'sonar') {
          sh 'sonar-scanner'
        }
      }
    }
}
}