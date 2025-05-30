import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Edit from "../assets/edit.svg";

function Home() {
  const nextSectionVis = useRef(null);
  const nextSectionMas = useRef(null);
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
          <h1 className="text-4xl font-bold mb-4">Welcome to GoalScape</h1>
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
                  <span className="text-xl font-medium">Pie chart to contain all types of goals (categories)</span>
                </div>
                {/* Second row with 2 columns */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-primary text-background rounded p-6 flex items-center justify-center">
                    <span className="text-lg">overall completion of goals selected from the pie chart?</span>
                  </div>
                  <div className="bg-primary text-background rounded shadow p-6 flex items-center justify-center">
                    <span className="text-lg">completion of specific goals from that selection from pie chart</span>
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
                    <th className="px-4 py-2">Finished</th> {/* on hover or something pull up goal expected finsihed date or something? or if its null put imaginative goal maybe gets filled out */}
                    <th className="px-4 py-2">Notes</th>
                    <img src={Edit} className="w-6 h-6 absolute top-2 right-2 hover:scale-115 transition ease-in-out duration-200 transform rounded-full"alt="Edit Icon" /> 
                  </tr>
                </thead>
                <tbody className="text-lg">
                  <tr>
                    <td className="border-t-3 px-4 py-2">Learn React</td>
                    <td className="border-t-3 px-4 py-2">Education</td>
                    <td className="border-t-3 px-4 py-2">50%</td>
                    <td className="border-t-3 px-4 py-2">23/01/01</td>
                    <td className="border-t-3 px-4 py-2">23/12/31</td>
                    <td className="border-t-3 px-4 py-2 truncate">Need to finish the documentation</td>
                  </tr>
                  <tr>
                    <td className="border-t-1 px-4 py-2">Run a marathon</td>
                    <td className="border-t-1 px-4 py-2">Health</td>
                    <td className="border-t-1 px-4 py-2">30%</td>
                    <td className="border-t-1 px-4 py-2">23/02/01</td>
                    <td className="border-t-1 px-4 py-2">23/12/31</td>
                    <td className="border-t-1 px-4 py-2 truncate">Training is going well</td>
                  </tr>
                  <tr>
                    <td className="border-t-1 px-4 py-2">Read 12 books</td>
                    <td className="border-t-1 px-4 py-2">Personal Development</td>
                    <td className="border-t-1 px-4 py-2">25%</td>
                    <td className="border-t-1 px-4 py-2">23/03/01</td>
                    <td className="border-t-1 px-4 py-2">23/12/31</td>
                    <td className="border-t-1 px-4 py-2 truncate whitespace-nowrap">Currently reading 'Atomic Habits'</td>
                  </tr>
                </tbody>
              </table>


            </div>
          </div>
        </div>
      </div>

    </>


  );
}
export default Home;