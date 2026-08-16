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
        stage ("Running MongoDB") {
            steps{
                sh 'docker pull mongo'
                sh 'docker network create app-network'
                sh 'docker network create mongodb-net'
                sh 'docker run -d --name=mongo --network=mongodb-net -v new-volume:/home/new-data/data/db -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin  -e MONGO_INITDB_ROOT_PASSWORD=secretpassword mongo:latest'
                
            }
        }
        stage ("Running MongoExpress") {
            steps{
                sh 'docker pull mongo-express'
                sh 'docker network create mongoexpnetwork'
                sh 'docker run -d --name mongoexpress --network=mongoexpnetwork -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin -e ME_CONFIG_MONGODB_ADMINPASSWORD=secretpassword -e ME_CONFIG_BASICAUTH=false -e ME_CONFIG_MONGODB_SERVER=mongo -p 8081:8081 mongo-express:latest'
                
            }
        }
        stage ("Running Node.js") {
            steps{
                sh 'docker build -t nodeapp .'
                sh 'docker run -d -p 3000:3000 --name node_app --network mongoexpnetwork nodeapp'
                
            }
        }
        stage ("Connecting docker network with containers") {
            steps {
                sh 'docker network connect app-network mongo'
                sh 'docker network connect app-network mongoexpress'
                sh 'docker network connect app-network nodeapp'
            }
        }
    }    
}
