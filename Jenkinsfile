pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
    }

  }
  stages {
    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }
  }
}