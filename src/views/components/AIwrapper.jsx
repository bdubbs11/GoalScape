import { useEffect, useState } from 'react';

const AIwrapper = ({ aiResponseData }) => {
  const [response, setResponse] = useState('');

  useEffect(() => {
    if (!aiResponseData || aiResponseData.length === 0) return;

    const formattedGoals = aiResponseData.map((goal, i) => {
      const start = goal.started ? new Date(goal.started).toLocaleDateString() : 'N/A';
      const finish = goal.goal_finish ? new Date(goal.goal_finish).toLocaleDateString() : 'N/A';
      const notes = goal.notes ? goal.notes : 'No notes.';

      return `${i + 1}. Goal: ${goal.goal}
   Start: ${start}
   Target Finish: ${finish}
   Progress: ${goal.progress}%
   Notes: ${notes}`;
    }).join('\n\n');

    const fullPrompt = `You're a motivational productivity coach. Given the goals below, create a summary and action plan for how to best complete all of them, considering their start date, deadline, current progress, and notes.

Goals:

${formattedGoals}

Please output:
- A quick overview paragraph
- Bullet-point action steps to finish remaining goals effectively.
`;

    const fetchAIResponse = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/ai/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: fullPrompt })
        });

        const data = await res.json();
        setResponse(data.message || 'No response from AI');
      } catch (error) {
        console.error('AI fetch failed:', error);
        setResponse('Error getting response from AI.');
      }
    };

    fetchAIResponse();
  }, [aiResponseData]);

  return (
    <div className="text-left whitespace-pre-wrap text-sm leading-relaxed max-h-[300px] overflow-y-auto">
      <strong>AI Advice:</strong>
      <p>{response || 'AI overview of goals will appear here once a category is selected.'}</p>
    </div>
  );
};

export default AIwrapper;
