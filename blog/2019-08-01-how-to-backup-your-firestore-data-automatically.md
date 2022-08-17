![](https://res.cloudinary.com/practicaldev/image/fetch/s--tgzVx0Hg--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://thepracticaldev.s3.amazonaws.com/i/qd6if4v0q0amuul5fdt4.png)

# How to backup your Firestore data automatically

[#serverless](/t/serverless) [#docker](/t/docker)

With my team, we use a lot of Firebase features like Firestore.

But there is no simple way to backup the data regularly.

We created a tiny [Docker image](https://hub.docker.com/r/zenika/alpine-firestore-backup/) `zenika/alpine-firestore-backup` and this simple tutorial to perform backups automatically on the Google Cloud Platform with Serverless services like `Cloud Run` and `Cloud Scheduler`.

# [](#step1-create-a-bucket-on-gcp)Step1: Create a bucket on GCP

Create a [GCP coldline bucket](https://cloud.google.com/storage/docs/storage-classes) and save the name of your bucket.

# [](#step2-create-a-service-account)Step2: Create a service account

Create a [GCP Service account](https://cloud.google.com/iam/docs/creating-managing-service-accounts) with the following rights:

*   `Owner`
*   `Cloud Datastore Owner`
*   `Cloud Datastore Import Export Admin`
*   `Storage Admin`

Then, download the [JSON private key file](https://cloud.google.com/iam/docs/creating-managing-service-account-keys).

# [](#step3-create-your-env-variables-for-cloud-run)Step3: Create your env variables for Cloud Run

Please fill in the following information:

*   `GCLOUD_PROJECT_ID`
*   `GCLOUD_BUCKET_NAME`
*   `GCLOUD_SERVICE_KEY`

For the `GCLOUD_SERVICE_KEY`, make a base64 encoded string using this command:  

    cat key.json | base64

# [](#step4-set-up-cloud-run)Step4: Set up Cloud Run

[Cloud Run](https://cloud.google.com/run/docs/deploying) is a serverless service to automatically serve your containers using http.

Create a `Cloud Run service` using the public image `gcr.io/zenika-hub/alpine-firestore-backup`.

Be careful to:

*   Choose your newly image in `latest`
*   Choose "Cloud Run (fully managed)" and a location
*   Enter a service name
*   Select "Allow unauthenticated invocations"
*   In the "Show optional settings / Environment variables", set the 3 environment variables seen in the previous section

You can test the service using your browser: `https://alpine-firestore-backup-XXX-run.app/`

Save the url created to call your Cloud Run Service.  
For example: `https://alpine-firestore-backup-XXX-run.app/backup`

[![cloud-run](https://res.cloudinary.com/practicaldev/image/fetch/s--a3v7Cxhq--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://user-images.githubusercontent.com/525974/62141405-ce9e0800-b2ec-11e9-8763-45efddb4c55d.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--a3v7Cxhq--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://user-images.githubusercontent.com/525974/62141405-ce9e0800-b2ec-11e9-8763-45efddb4c55d.png)

# [](#step5-launch-with-cloud-scheduler)Step5: Launch with Cloud Scheduler

[Cloud Scheduler](https://cloud.google.com/scheduler/docs/) allow you to schedule a cronjob in order to call a https endpoint at regular intervals.

Prepare a `Cloud Scheduler` to send a request to your `Cloud Run Service` every time you need.

For example, every Monday at 3:00am `0 3 * * 1` a backup will be done and stored in your bucket.

[![cloud-scheduler](https://res.cloudinary.com/practicaldev/image/fetch/s--_99IXCZk--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://user-images.githubusercontent.com/525974/62141536-02792d80-b2ed-11e9-80fe-b81466cb862d.png)](https://res.cloudinary.com/practicaldev/image/fetch/s--_99IXCZk--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://user-images.githubusercontent.com/525974/62141536-02792d80-b2ed-11e9-80fe-b81466cb862d.png)

# [](#step6-monitor-the-backup-operations)Step6: Monitor the backup operations

You can also check the current status of each backup operation using the following url `https://alpine-firestore-backup-XXX-run.app/list`

# [](#conclusion)Conclusion

Feel free to have a look at the Docker image we created for this operation [here on github](https://github.com/Zenika/alpine-firestore-backup) or [here on dockerhub](https://hub.docker.com/r/zenika/alpine-firestore-backup/).

We also have others images we maintained like a popular and small [Chromium Headless image](https://github.com/Zenika/alpine-chrome) called `zenika/alpine-chrome`.