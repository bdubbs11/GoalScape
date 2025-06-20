import React, { useEffect, useState } from "react";
import Close from "../assets/close.svg";

function AddGoals(){



  const [goalInput, setGoalInput] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [category, setCategory] = useState("");
  const [otherCategory, setOtherCategory] = useState("");
  const [progress, setProgress] = useState("");
  const [startDate, setStartDate] = useState("");
  const [goalFinishDate, setGoalFinishDate] = useState("");
  const [notes, setNotes] = useState("");

  // get current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();

  // goals data
  const [goals, setGoals] = useState([]);

  // show the modal
  const handleSubmit = (e) => {
    e.preventDefault();
    if (goalInput.trim() !== ""){ // need to add if it is empty try and fill the goal out before you submit it
      setShowModal(true);
    }
  }

  const handleGoalSubmit = async (e) => {
    e.preventDefault();

    const goalData = {
      goal: goalInput,
      category: category === "Other" ? otherCategory : category,
      progress: progress,
      start: startDate,
      goalFinish: goalFinishDate,
      notes: notes,
    };

    try {
      const response = await fetch('/api/goals/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goalData),
      });
      if(response.ok){
        console.log('Goal was added Successfully');
        setShowModal(false);
        // do i need to reset the set's here once things are added?
        setGoalInput(""); 
        setCategory("");
        setOtherCategory("");
        setProgress("");
        setStartDate("");
        setGoalFinishDate("");
        setNotes("");

        // refresh the goals list
        fetchGoals();
      } else {
        const errorText = await response.text();
        console.error('Response is not ok! Failed to add the new goal');
        console.error('Status:', response.status);
        console.error('Response body:', errorText);
      } 
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
const fetchGoals = () => {
  fetch('/api/goals')
    .then(res => res.json())
    .then(data => setGoals(data))
    .catch(err => console.error("Error fetching goals", err));
}
    useEffect(() => {
      fetchGoals();
    }, []);

    const last3goals = goals.sort((a,b) => new Date(b.created_at) - new Date(a.created_at)).slice(0,3)

  return (
    <div className="flex flex-col">

      <div className="container grid grid-cols-16 min-w-screen min-h-screen">
        <div className="col-start-3 col-span-12">
          <h1 className="text-3xl mt-20 font-bold">Enter Your Goals Here</h1>
          {/* search bar */}
          {/* on click open up modal for the rest of the logic */}
          <form type="submit" className="space-x-4" onSubmit={handleSubmit}>
              <input type="text" placeholder="Add your goals here..." value={goalInput} onChange={(e) => setGoalInput(e.target.value)} className="border-2 border-primary-200 bg-primary text-background rounded-full items-center focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent my-10 w-2/5 py-4 px-6"/>
              <button className="bg-accent text-primary font-semibold py-4 px-6 rounded-full hover:bg-accent/70 transition ease-in-out duration-200"> Submit </button>
          </form>

            <h2 className="text-3xl font-bold mb-4 mt-30 mb-10">Last Added goals</h2>

            <div className="flex w-full justify-center">
              <table className="table-auto w-1/2 text-left ">
                  <thead className="text-xl">
                    <tr className="">
                      <th className="px-4 py-2">Goal</th>
                       <th className="px-4 py-2">Category</th>
                      <th className="px-4 py-2">Date Added</th>
                    </tr>
                  </thead>
                  <tbody className="text-lg">
                    {goals.sort((a,b) => new Date(b.created_at) - new Date(a.created_at)).slice(0,3).map(goal =>( 
                      <tr>
                        <td className="border-t-3 px-4 py-2 capitalize">{ goal.goal }</td>
                        <td className="border-t-3 px-4 py-2 capitalize">{ goal.category }</td>
                        <td className="border-t-3 px-4 py-2">{ new Date(goal.created_at).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' }) }</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
        </div>
      </div>


{/* Modal */}
{/* need to add on click outside of modal set it to false  */}
      {showModal && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative bg-primary text-background rounded-xl p-8 w-96 shadow-lg">
            <img src={Close}  onClick={() => setShowModal(false)} className="w-6 h-6 absolute top-2 right-2 hover:scale-115 transform transition ease-in-out duration-200"alt="Close Icon" /> 
              <h3 className="text-xl font-bold text-center mb-4">{goalInput}</h3>
              
            <form action="" onSubmit={handleGoalSubmit}>


            <label className="block mb-2 font-medium">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mb-4 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              >
                <option value="" disabled>Select a category</option>
                <option value="New Skill: Career">New Skill: Career</option>
                <option value="New Skill: General">New Skill: General</option>
                <option value="Health & Wellness">Health & Wellness</option>
                <option value="Personal Development">Personal Development</option>
                <option value="Relationships & Social">Relationships & Social</option>
                <option value="Financial Goals">Financial Goals</option>

                <option value="Other">Other</option>
              </select>

            {category === "Other" && (
              <>
                <label className="block mb-2 font-medium ">Other</label>
                <input className="w-full mb-4 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent" type="text" placeholder="Please specify your category..." onChange={(e) => setOtherCategory(e.target.value)}/>
              </>
            )}

            {/* tomorrow need to figure out why i can not type in the other field. */}



              <label className="block mb-2 font-medium">Progress (%)</label>
              <input
                type="number"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                min="0"
                max="100"
                className="w-full mb-4 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              />

              <label className="block mb-2 font-medium">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full mb-4 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              />

              <label className="block mb-2 font-medium">Goal Finish Date</label>
              <input
                type="date"
                value={goalFinishDate}
                onChange={(e) => setGoalFinishDate(e.target.value)}
                className="w-full mb-4 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              />

              <label className="block mb-2 font-medium">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                rows="3"
                placeholder="Write some notes..."
              ></textarea>

              <div className="space-x-4">
                <button type="submit" className="bg-accent text-primary py-2 px-4 rounded-full hover:bg-accent/70 transition ease-in-out duration-200">
                  Save Goal
                </button>
              </div>



            </form>
          </div>
        </div>
      )}


    </div>


// i want to have a search bar for a goal and from that it will pop up once added to give it selectors to what 
// type of goal it is. and that tag will be appended to goal in the database.
  );
}


export default AddGoals;