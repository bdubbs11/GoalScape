import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Edit from "../assets/edit.svg";
import PieChart from './components/Piechart.jsx';
import RadialChart from './components/Radialchart.jsx';

function Home() {
  const nextSectionVis = useRef(null);
  const nextSectionMas = useRef(null);

  const [userName, setUserName] = useState('');
  const [goals, setGoals] = useState([]);
  const [pieGoals, setPieGoals] = useState([]);
  const [radialGoals, setRadialGoals] = useState([]);
  // this is for the pies
  const [pieSelected, setPieSelected] = useState(null);
  // const [loading, setLoading] = useState(true);

  // this is for creating an editing state to the goals
  const [isEditing, setIsEditing] =useState(false);
  const [editableGoals, setEditableGoals] =useState([]);


  // Add missing handleChange function
  const handleChange = (index, field, value) => {
    const updatedGoals = [...editableGoals];
    if (typeof index === 'number') {
      updatedGoals[index][field] = value;
    } else {
      // If index is actually an ID
      const goalIndex = updatedGoals.findIndex(goal => goal.id === index);
      if (goalIndex !== -1) {
        updatedGoals[goalIndex][field] = value;
      }
    }
    setEditableGoals(updatedGoals);
  };

  // Add missing format function
  const format = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // Add saveChanges function to update goals in backend
  const saveChanges = async () => {
    try {
      console.log("Starting to save goals:", editableGoals);
      
      // Fetch current goals from backend for comparison
      const currentGoalsResponse = await fetch('http://localhost:3000/api/goals');
      const currentGoals = await currentGoalsResponse.json();
      
      // Find goals that were actually edited by comparing with backend
      const editedGoals = editableGoals.filter((editedGoal) => {
        const currentGoal = currentGoals.find(goal => goal.id === editedGoal.id);
        if (!currentGoal) return false;
        
        // Compare relevant fields
        return (
          editedGoal.goal !== currentGoal.goal ||
          editedGoal.category !== currentGoal.category ||
          editedGoal.progress !== currentGoal.progress ||
          editedGoal.notes !== currentGoal.notes ||
          editedGoal.goal_finish !== currentGoal.goal_finish
        );
      });
      
      console.log("Current goals from backend:", currentGoals.length);
      console.log("Goals that were actually edited:", editedGoals.length);
      
      // Update only the edited goals, one at a time
      for (const goal of editedGoals) {
        const requestBody = {
          id: goal.id,
          goal: goal.goal,
          category: goal.category,
          progress: goal.progress,
          start: goal.started ? goal.started.split('T')[0] : null, // Convert ISO date to YYYY-MM-DD
          goalFinish: goal.goal_finish ? goal.goal_finish.split('T')[0] : null, // Convert ISO date to YYYY-MM-DD
          notes: goal.notes
        };
        
        console.log("Sending request for edited goal:", goal.id, requestBody);
        
        const response = await fetch('http://localhost:3000/api/goals/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        });
        
        console.log("Response for goal", goal.id, ":", response.status, response.statusText);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Result for goal", goal.id, ":", result);
      }
      // console.log("All update results:", results);
      
      // Update the main goals state with the edited goals
      setGoals(editableGoals);
      setIsEditing(false);
      

      
      // console.log("All goals updated successfully!");
    } catch (error) {
      console.error("Failed to update goals:", error);
      // You might want to show an error message to the user here
    }
  };

  // fetching user or just user 1 (me)
  useEffect(() => {
    fetch('/api/users/1')
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(user => {
      // console.log('Fetched user:', user); 
      setUserName(user.name)
    })
    .catch(err => {
      console.error('error fetching user:', err);
      setUserName('Guest'); // Fallback
    });

    // Fetch goals
    fetch('/api/goals')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        // console.log("Raw goals data:", data);
        setGoals(data);
        setEditableGoals(data); // creating a copy for when the goals need to be edited
        createPieGoals(data, setPieGoals);
      })
      .catch(err => {
        // console.error('Error fetching goals:', err);
        // Add some sample data for testing when backend is down
        const sampleData = [
          { id: 1, goal: "Sample Goal 1", category: "Health", progress: 75, started: "2024-01-01", goal_finish: "2024-12-31", finished: null, notes: "Sample note" },
          { id: 2, goal: "Sample Goal 2", category: "Career", progress: 50, started: "2024-01-01", goal_finish: "2024-12-31", finished: null, notes: "Sample note" },
          { id: 3, goal: "Sample Goal 3", category: "Health", progress: 25, started: "2024-01-01", goal_finish: "2024-12-31", finished: null, notes: "Sample note" }
        ];
        setGoals(sampleData);
        setEditableGoals(sampleData);
        createPieGoals(sampleData, setPieGoals);
      });

  }, []);

  useEffect(() => {
    if (pieSelected && goals.length > 0) {
      createRadialGoals(goals, setRadialGoals, pieSelected);
    }
  }, [pieSelected, goals]);



  const scrollToVisual = () => {
    nextSectionVis.current?.scrollIntoView({behavior: 'smooth'});
  }
  const scrollToMaster = () => {
    nextSectionMas.current?.scrollIntoView({behavior: 'smooth'});
  }
  return (
    <>
      <div className="flex flex-col">

        <div className="flex flex-col items-center justify-center h-screen -mt-8">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to GoalScape, <span className="underline decoration-solid cursor-pointer ml-1 hover:opacity-70 transition ease-in-out duration-200"> {userName || 'Guest'} </span>
            </h1>
          <p className="text-lg">Here you can visualize and conceptualize your goals.<Link className="underline decoration-solid cursor-pointer ml-1 hover:opacity-70 transition ease-in-out duration-200" to="/addGoals">Add goal now? </Link></p>
          <div className="flex gap-6 mt-10"><button onClick={scrollToVisual} className="text-sm underline hover:opacity-70 transition ease-in-out duration-200">↓ Scroll to Visual List</button>
            <button onClick={scrollToMaster} className="text-sm underline hover:opacity-70 transition ease-in-out duration-200">↓ Scroll to Master List</button>
          </div>
        </div>

        {/* this will be a component that will display all the goals from the database */}
        {/* this section will be a visual componenet */}
        {/* gigll it with flowbite charts https://flowbite.com/docs/plugins/charts/ */}
        
        <div className="container grid grid-cols-16 min-w-screen">
          <div className="col-start-3 col-span-12">
            <div id="Vis" ref={nextSectionVis} className="min-h-screen p-8">
              <h2 className="text-3xl font-bold mb-4 mt-10">Your Goals Visualized</h2>

              <div className="flex flex-col gap-8 mt-10">
                {/* pie chart info */}
                <div className="w-full bg-primary text-background p-6 flex items-center justify-center">



                <PieChart data={pieGoals} onSliceClick={setPieSelected} />



                </div>
                {/* Second row with 2 columns */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-primary text-background rounded p-6 flex items-center justify-center">
                    <RadialChart data={radialGoals} selectedCategory={pieSelected} />
                  </div>
                  <div className="bg-primary text-background rounded shadow p-6 flex items-center justify-center">
                    <span className="text-lg">AI overview of goals goes here</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>


        
        {/* this section will it be all written out and availble to be organzied by the user */}
        <div className="container grid grid-cols-16 min-w-screen">
          <div className="col-start-3 col-span-12">
            <div ref={nextSectionMas} className="min-h-screen p-8 relative">
              <h2 className="text-3xl font-bold mb-4 mt-10 mb-10">List view of goals</h2>
              <table className="table-auto w-full text-left">
                <thead className="text-xl">
                  <tr className="relative">
                    <th className="px-4 py-2">Goal</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Progress</th>
                    <th className="px-4 py-2">Started</th>
                    <th className="px-4 py-2">Finished</th>
                    <th className="px-4 py-2">Notes</th>
                    <th className="px-4 py-2 relative">
                      {isEditing ? (
                        <button 
                          className="absolute top-2 right-2 bg-green-500 text-white text-sm px-3 py-1 rounded hover:bg-green-600 transition ease-in-out duration-200"
                          onClick={() => {
                            saveChanges();
                            setIsEditing(false);
                          }}
                        >
                          Save
                        </button>
                      ) : (
                        <img 
                          src={Edit} 
                          className="w-6 h-6 absolute top-2 right-2 hover:scale-115 transition ease-in-out duration-200 transform rounded-full cursor-pointer" 
                          alt="Edit Icon" 
                          onClick={() => {
                            setIsEditing(true);
                          }} 
                        />
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody className="text-lg">

                {editableGoals.map((goal,index) => (
                  <tr key={goal.id}>
                    <td className="border-t-3 px-4 py-2 capitalize">{ goal.goal }</td>
                    <td className="border-t-3 px-4 py-2 capitalize">{ goal.category }</td>
                    
                    <td className="border-t-3 px-4 py-2">
                      {isEditing ? (
                      <input type="number" value={goal.progress}
                      onChange={e => handleChange(index, 'progress', e.target.value)}
                      className="w-full border rounded px-2" />
                      ) : `${goal.progress}%`}
                    </td>

                    <td className="border-t-3 px-4 py-2">{ new Date(goal.started).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' }) }</td>
                    <td className="border-t-3 px-4 py-2">
                      {isEditing ? (
                        <input
                          type="date"
                          value={goal.finished ? goal.finished.slice(0, 10) : ""}
                          onChange={(e) => handleChange(goal.id, "finished", e.target.value)}
                          className="border rounded p-1"
                        />
                      ) : (
                        <span>
                          {/* Hover tooltip logic can still show the goal target date */}
                          <span className="group relative">
                            goal: {format(goal.goal_finish)}
                            <div className="hidden group-hover:block absolute text-sm bg-gray-700 text-white p-1 rounded mt-1 z-10">
                              actual: {goal.finished ? format(goal.finished) : "Not finished yet"}
                            </div>
                          </span>
                        </span>
                      )}
                    </td>


                    
                    <td className="border-t-3 px-4 py-2">
                     {isEditing ? (
                      <textarea
                        value={goal.notes}
                        onChange={e => handleChange(index, 'notes', e.target.value)}
                        className="w-full border rounded px-2"
                      />
                    ) : goal.notes}
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>


            </div>
          </div>
        </div>
      </div>

    </>


  );
}

function createPieGoals(data, setPieGoals){
  // return just data for it to be the full thing querry
  // this will allow for the pie chart to be the percentage of goal categories...
  // console.log("createPieGoals called with data:", data);
  
  if (!data || data.length === 0) {
    // console.log("No data provided to createPieGoals");
    setPieGoals([]);
    return;
  }

  const counts = {};
  data.forEach(goal => {
    const category = goal.category;
    // console.log("Processing goal:", goal.goal, "with category:", category);
    counts[category] = (counts[category] || 0) + 1;
  });

  // console.log("Category counts:", counts);

  const total = data.length;
  const pieData = Object.entries(counts).map(([label, count]) => ({
    label,
    value: ((count / total) * 100).toFixed(2),
  }));
  
  // console.log("Final pie data:", pieData);
  setPieGoals(pieData);
}

function createRadialGoals(data, setRadialGoals, pieSelected){
  // from progress of specific goals need to figure out how many are done
  // how many are in progress and hten how many are to do 
  if(pieSelected && data.length > 0){
    const selectedGoals = data.filter(x => x.category === pieSelected);

    const total = selectedGoals.length;
    const done = selectedGoals.filter(x => x.progress === 100).length;
    const inProgress = selectedGoals.filter(x => x.progress > 0 && x.progress < 100).length;
    const toDo = total - done - inProgress;

    setRadialGoals([done, inProgress, toDo]);
      // console.log("Setting radial goals to:", [done, inProgress, toDo]);
  // console.log("the category:", pieSelected);
  }

}


export default Home;