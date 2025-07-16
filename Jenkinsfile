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

                // Copy .jar lên server
                bat '''
                    scp target/bookmanagement-0.0.1-SNAPSHOT.jar user@192.168.1.100:/home/user/app/
                '''

                // SSH vào server và chạy ứng dụng
                bat '''
                    ssh user@192.168.1.100 '
                        pkill -f bookmanagement || true
                        nohup java -jar /home/user/app/bookmanagement-0.0.1-SNAPSHOT.jar > /home/user/app/app.log 2>&1 &
                    '
                '''
            }
        }
    }
}
