pipeline {
    agent any

    tools {
        maven 'Maven 3.9.10' // Đã cấu hình trong Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/vdprogramm/QlythuVi.git', branch: 'master'
            }
        }

        stage('Build') {
            steps {
                sh 'mvn clean install'
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'
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
