pipeline {
  agent any
  
  stages {
    stage('Build') {
      steps {
        
        sh 'docker-compose up --build -d'
        
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