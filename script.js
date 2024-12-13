const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript",
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50,
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150,
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500,
      },
    ],
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47,
      },
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150,
      },
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400,
      },
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39,
      },
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140,
      },
    },
  ];
  
  function getLearnerData(course, ag, submissions) {
    let tempResult = [];
    let learnerIdArr = [];
  
    // Get unique learner IDs
    for (let i = 0; i < submissions.length; i++) {
      learnerIdArr.push(submissions[i].learner_id);
    }
   //console.log(learnerIdArr, "=== learnerIdArr");
  
    var uniqueArray = learnerIdArr.filter(
      (value, index, array) => array.indexOf(value) === index
    );
    //console.log(uniqueArray, "=== learner Id");

  
    for (let j = 0; j < uniqueArray.length; j++) {
      let tempObj = { id: uniqueArray[j] }; // Change learner_id to id
      let sum = 0;
      let totalPoints = 0;
  
      for (let i = 0; i < submissions.length; i++) {
        const Submission = submissions[i];
        const assignment = ag.assignments.find(
          (a) => a.id === Submission.assignment_id
        );
        if (!assignment) continue;
  
        const dueDate = new Date(assignment.due_at);
        const submittedDate = new Date(Submission.submission.submitted_at);
  
        if (uniqueArray[j] === Submission.learner_id) {
          const isLate = submittedDate > dueDate; //check if submission is late
          let adjustedScore;
  
          switch (assignment.id) {
            case 1:
              adjustedScore = isLate
                ? Math.max(Submission.submission.score - 15, 0)
                : Submission.submission.score;
              break;
            default:
              adjustedScore = Submission.submission.score;
          }
  
          // Store the adjusted score as a percentage of total points
          tempObj[assignment.id] = parseFloat(
            (adjustedScore / assignment.points_possible).toFixed(2)
          );
  
          sum += adjustedScore;
          totalPoints += assignment.points_possible;
        }
      }
  
      tempObj.avg = parseFloat((sum / totalPoints).toFixed(3)); // Add the average score for the learner as a percentage
  
      // Push the learner's data (tempObj) to the result
      tempResult.push(tempObj);
    }
  
    return tempResult;
  }
  
  // Get the result and log it
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(result, "===Final Results");