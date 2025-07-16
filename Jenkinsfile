pipeline {
    agent any

    tools {
        maven 'Maven 3.9.10' // đúng tên em đã cấu hình
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

        stage('Deploy') {
            steps {
                echo 'Deploying to server...'
                // Có thể dùng scp/rsync/docker/... ở đây
            }
        }
    }
}
