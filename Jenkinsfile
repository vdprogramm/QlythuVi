pipeline {
    agent any

    tools {
        maven 'Maven 3.9.10' // Tên Maven đã cài trong Jenkins
    }

    environment {
        IMAGE_NAME = 'bookmanagement-app'
        IMAGE_TAG = 'latest'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/vdprogramm/QlythuVi.git', branch: 'master'
            }
        }

        stage('Build') {
            steps {
                bat 'mvn clean install'
            }
        }

        stage('Test') {
            steps {
                bat 'mvn test'
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    bat "docker build -t %IMAGE_NAME%:%IMAGE_TAG% ."
                }
            }
        }

        stage('Docker Run') {
            steps {
                script {
                    bat '''
                        docker stop book_app || echo "No container to stop"
                        docker rm book_app || echo "No container to remove"
                        docker run -d -p 8082:8080 --name book_app %IMAGE_NAME%:%IMAGE_TAG%
                    '''
                }
            }
        }
    }
}
