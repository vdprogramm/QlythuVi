pipeline {
    agent any


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
