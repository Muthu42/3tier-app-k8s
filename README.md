# 🚀 3-Tier Application on Kubernetes

## 📌 Project Overview

This project demonstrates deployment of a **3-tier web application** using Kubernetes.

Architecture includes:

* Frontend (UI)
* Backend (Node.js API)
* MySQL Database

---

## 🏗️ Architecture

User → Frontend → Backend → MySQL

* Frontend exposed via **NodePort (30082)**
* Backend exposed via **NodePort (30500)**
* MySQL exposed internally via **ClusterIP**

---

## ⚙️ Tech Stack

* Node.js (Backend)
* MySQL (Database)
* Docker
* Kubernetes (kubeadm cluster)
* AWS EC2

---

## 📁 Project Structure

3tier-app-k8s/
├── frontend/
├── backend/
├── db/
├── docker-compose.yml
└── k8s/
├── namespace.yml
├── frontend-deployment.yml
├── frontend-service.yml
├── backend-deployment.yml
├── backend-service.yml
├── mysql-deployment.yml
└── mysql-service.yml

---

## 🚀 Deployment Steps

1. Build and push Docker images:
   docker build -t muthu42doc/backend-k8s:latest .
   docker push muthu42doc/backend-k8s:latest

2. Apply Kubernetes manifests:
   kubectl apply -f k8s/

3. Access application:
   Frontend: http://<EC2_PUBLIC_IP>:30082
   Backend: http://<EC2_PUBLIC_IP>:30500

---

## 🧠 Key Kubernetes Concepts Used

* **Namespace** → Resource isolation
* **Deployment** → Pod management and scaling
* **Service** → Communication between components
* **NodePort** → External access
* **ClusterIP** → Internal communication

---

## 🔧 Issues Faced & Troubleshooting

### 1. Pods stuck in Pending

* Cause: Worker nodes were stopped
* Fix: Started EC2 worker instances

---

### 2. CrashLoopBackOff (mysql not defined)

* Cause: Missing import in backend
* Fix:
  const mysql = require("mysql2");

---

### 3. Backend exiting immediately

* Cause: Missing app.listen()
* Fix: Restored full backend code

---

### 4. Log file error (ENOENT)

* Cause: Directory not present inside container
* Fix:
  fs.mkdirSync("/var/log/myapp", { recursive: true });

---

### 5. Syntax error in function

* Cause: writeLog function not closed properly
* Fix: Corrected function structure

---

## 📈 Kubernetes Features Tested

### Scaling

kubectl scale deployment frontend --replicas=3

### Self-Healing

kubectl delete pod <pod-name>

### Rolling Update

kubectl rollout restart deployment backend

---

## 🎯 Learning Outcomes

* Deployed a complete 3-tier application on Kubernetes
* Implemented service-based communication
* Debugged real Kubernetes issues
* Understood container lifecycle and networking

---

## 🔮 Future Improvements

* Persistent Volumes for MySQL
* ConfigMap & Secrets
* Ingress Controller
* CI/CD pipeline integration
* Monitoring (Prometheus & Grafana)

---
