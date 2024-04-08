## Issue
Currently if a user walks away from their computer, the lack of person to track causes the app to crash.

## Proposed fix
Look into the tracking components and add a condition for no results e.g. an auto pause of session. A check for startData && postrureData being undefined should allow for this.

 Alternatively a pause button may help however this will not account for the crash issue if people forget. 