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
        stage("Docker start and enable service.." ) {
            steps {
                echo "Starting the docker service.."
                sh 'sudo systemctl enable docker'
                sh 'sudo systemctl start docker'
                sh 'sudo systemctl status docker'
            }
        }
        stage ("Installing docker compose plugin") {
            steps {
                sh 'sudo dnf install -y docker-compose-plugin'
            }
        }
        stage ("Building the image and starting the containers") {
            steps {
                sh 'docker compose up'
            }
        }
    }    
}
