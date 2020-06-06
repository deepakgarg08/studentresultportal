async function handleResult() {

    console.log("hello world")

    // console.log(ctl00_working_dropCourse.value)
    // console.log(ctl00_working_textRollNo.value)
    // console.log(dob.value)

    if (ctl00_working_dropCourse.value && ctl00_working_textRollNo.value && dob.value) {
        console.log('passed')
        const studentDetails = {

            dropcourse: ctl00_working_dropCourse.value,
            rollno: ctl00_working_textRollNo.value,
            dob: dob.value
        }
        console.log('studentDetails', studentDetails)

        const rawResponse = await fetch('http://127.0.0.1:3000/result', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentDetails)
        });
        const content = await rawResponse.json();
        console.log('check response result', content)
        if (content.result) {
            alert(content.result)
        }
        else {

            console.log(content.enrollment);

            ctl00_working_lbl_EnrollmentNo.innerHTML = content.enrollment
            ctl00_working_lbl_RollNo.innerHTML = content.rollno
            ctl00_working_lbl_Name.innerHTML = content.nameofstudent
            ctl00_working_lbl_FName.innerHTML = content.fatherName
            ctl00_working_lbl_MName.innerHTML = content.motherName
            ctl00_working_lbl_dob.innerHTML = content.dateofbirth
            ethm.innerHTML = content.ethm
            hthm.innerHTML = content.hthm
            mthm.innerHTML = content.mthm
            ssthm.innerHTML = content.ssthm
            scthm.innerHTML = content.scthm
            phthm.innerHTML = content.phthm
            sspm.innerHTML = content.sspm
            scpm.innerHTML = content.scpm
            phpm.innerHTML = content.phpm
            egm.innerHTML = content.egm
            hgm.innerHTML = content.hgm
            mgm.innerHTML = content.mgm
            ssgm.innerHTML = content.ssgm
            scgm.innerHTML = content.scgm
            phgm.innerHTML = content.phgm

            etm.innerHTML = content.etm
            htm.innerHTML = content.htm
            mtm.innerHTML = content.mtm
            sstm.innerHTML = content.sstm
            sctm.innerHTML = content.sctm
            phtm.innerHTML = content.phtm

            ctl00_working_lbl_Total.innerHTML = content.total_marks
            ctl00_working_lbl_TotalGrade.innerHTML = content.total_grade
            // ctl00_working_lbl_Result.innerHTML = 'pass' || 'fail' || 're'

            document.getElementById('showresult').style.display = "block"
        }
    }
    else {
        alert('invalid input')
        console.log('Invalid input')
    }







}