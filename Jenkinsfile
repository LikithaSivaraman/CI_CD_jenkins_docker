pipeline {
    agent {
        label 'Agent1'
    }
    stages {
        stage('Git clone') {
            steps {
                git 'https://github.com/LikithaSivaraman/CI_CD_jenkins_docker.git'
            }
        }
        stage("Docker install") {
            steps {
                sh 'sudo dnf update -y'
                sh 'sudo dnf install -y docker'
            }
        }
    }    
}