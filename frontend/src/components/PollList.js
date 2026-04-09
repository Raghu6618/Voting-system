import PollCard from './PollCard';

const PollList = ({ polls }) => {
  return (
    <div>
      {polls.map(poll => <PollCard key={poll._id} poll={poll} />)}
    </div>
  );
};

export default PollList;