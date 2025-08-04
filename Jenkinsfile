pipeline {
    agent any

    tools {
        maven 'Maven 3.9.10' // Đúng tên đã cài trong Jenkins
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
                bat 'mvn clean install -DskipTests=false'
            }
        }

        stage('Test') {
            steps {
                bat 'mvn test'
            }
        }

        stage('Docker Build') {
            steps {
                bat "docker build -t %IMAGE_NAME%:%IMAGE_TAG% ."
            }
        }

        stage('Clean Old Container') {
            steps {
                script {
                    try {
                        bat 'docker stop book_app'
                    } catch (e) {
                        echo 'Container not running — skip stop.'
                    }

                    try {
                        bat 'docker rm book_app'
                    } catch (e) {
                        echo 'No container to remove — skip remove.'
                    }
                }
            }
        }

        stage('Docker Run') {
            steps {
                bat 'docker run -d -p 8082:8080 --name book_app %IMAGE_NAME%:%IMAGE_TAG%'
            }
        }

        stage('Show Logs') {
            steps {
                echo 'Container started. Showing last 20 lines of logs:'
                bat 'docker logs --tail 20 book_app'
            }
        }
    }
}
