
@Library('ceiba-jenkins-library') _
pipeline {
    agent {
        label 'Slave_Induccion'      
    }

    tools {
        jdk 'JDK8_Centos'
    }
    stages {
        stage('Checkout'){
            steps{
                echo "------------>Checkout<------------"
                checkout scm
            }
        }
  
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Linter') {
            steps {
                sh 'npm run lint'
            }
        }

         stage('Test') {
            steps {
                sh 'npm run test'
            }
        }

        // cypress run --headless
        // stage('Test end-to-end') {
        //     steps{
        //         echo "------------>Testing Cypress<------------"                 
        //         sh 'npm run e2e:run'
        //     }
        // }
        

      stage('Static Code Analysis') {
			steps{
        echo '------------>Análisis de código estático<------------'
				sonarqubeMasQualityGatesP(sonarKey:'co.com.ceiba.adn:prestamosceiba-manuel.ortiz',
        sonarName:'''"CeibaADN-PrestamosCeiba(manuel.ortiz)"''',
        sonarPathProperties:'./sonar-project.properties')
			}
		}
      stage('Build') {
      steps{
              sh 'npm run build'
          }
    }
    }

    post{
        always {
            echo 'This will always run'
        }
        success {
            echo 'This will run only if successful'
        }
        failure {
            echo 'This will run only if failed'
            mail (to: 'manuel.ortiz@ceiba.com.co',
            subject: "Failed Pipeline:${currentBuild.fullDisplayName}",
            body: "Something is wrong with ${env.BUILD_URL}")
        }
        unstable {
            echo 'This will run only if the run was marked as unstable'
        }
        changed {
            echo 'This will run only if the state of the Pipeline has changed'
            echo 'For example, if the Pipeline was previously failing but is now successful'
        }
    }
}
