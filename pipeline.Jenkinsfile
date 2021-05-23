pipeline{
    agent any
    
    environment{
      git_commit_id = getGitLastCommitId()
      removeContainer = "docker rm node -f"
      nodeBuildImage = "docker build . -t shivapoudyal/node:$git_commit_id"
      nodeContainer  = "docker run -d -v /home/ubuntu/db.env:/app/db.env -p 3000:3000 --name node shivapoudyal/node:$git_commit_id"
  }
    
    stages{
        stage('scm checkout'){
            steps{
                git credentialsId: 'git-cred', url: 'https://github.com/shivapoudyal/node-mongo-docker.git'
            }
        }
        
        stage('Build Image and run containers'){
            steps{
                sh "$removeContainer"
                sh "$nodeBuildImage"
                sh "$nodeContainer"
            }
        }
        
        stage ('docker-hub login & push image'){
            steps{
                // Snippet Generator -> select "withCredentials" add secrete text -> enter your dockerhub pass (*make variable and id name in singleword)
              withCredentials([string(credentialsId: 'dockerHubPassword', variable: 'dockerHubCred')]) {
                sh "docker login -u shivapoudyal -p $dockerHubCred"
            }
                sh "docker push shivapoudyal/node:$git_commit_id"
            }
        }
        
        stage('Deploy containe to production'){
            steps{
            
                // install plugin "SSH Agent"
                // Sample step -> select 'sshagent' -> add username & private key -> private key (pem file) and username (ubuntu)
                // also, grant docker access to ubuntu user -> sudo chown 1000:1000 /var/run/docker.sock
                // create a network into production server (manually) -> docker network create -d bridge php_nginx_net
                sshagent(['production-server']) {
                    sh "ssh -o StrictHostKeyChecking=no ubuntu@172.31.46.160 $removeContainer"
                    sh "ssh -o StrictHostKeyChecking=no ubuntu@172.31.46.160 $nodeContainer" //(if region same -> private ip, else -> public ip)
                }
            }
        }
    }
}

def getGitLastCommitId(){

    // Snippet Generator -> select "shell script" and advance click to "Return standard output"
    def commitId = sh returnStdout: true, script: 'git rev-parse --short HEAD'
    return commitId;
}
