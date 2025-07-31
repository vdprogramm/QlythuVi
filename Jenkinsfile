pipeline {
    agent any

    tools {
        maven 'Maven 3.9.10' // đúng tên bạn đã cấu hình
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
                echo 'Deploying locally on Windows...'

                // Tạo thư mục nếu chưa có
                bat 'if not exist C:\\home\\user\\app mkdir C:\\home\\user\\app'

                // Copy file .jar sang thư mục đích
                bat 'copy /Y target\\bookmanagement-0.0.1-SNAPSHOT.jar C:\\home\\user\\app\\'

                // Chạy ứng dụng (nếu cần)
                bat '''
                    taskkill /F /IM java.exe || echo "No java process to kill"
                    start "" java -jar C:\\home\\user\\app\\bookmanagement-0.0.1-SNAPSHOT.jar
                '''
            }
        }
    }
}
