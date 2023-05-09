import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdDownloadForOffline } from 'react-icons/md';
import { v4 as uuid } from 'uuid';
import { client, urlFor } from '../client';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import MasonryLayout from './layouts/MasonryLayout';
import Spinner from './layouts/Spinner';

const PinDetail = ({ user }) => {
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const { pinId } = useParams();

  const fetchPinDetails = async () => {
    let query = pinDetailQuery(pinId);
    
    if(query) {
      await client.fetch(query)
      .then((data) => {
        setPinDetail(data[0]);
        
        if(data[0]) {
          query = pinDetailMorePinQuery(data[0]);
          
          client.fetch(query)
          .then((response) => {
            setPins(response);
          })
        }
      }
      )
    }
  };

  const addComment = async () => {
    if(comment) {
      setAddingComment(true);

      await client.patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{
          comment,
          _key: uuid(),
          postedBy: {
            _type: 'postedBy',
            _ref: user._id
          }
        }])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment('');
          setAddingComment(false);
        })
    }
  }
  
  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);
  
  if(!pinDetail) return <Spinner message="Loading pin..." />
  console.log(pins);
  return (
  <>
    <div className="flex xl-flex-row flex-col m-auto bg-white" style={{ maxWidth: '1500px', borderRadius: '32px' }}>
      <div className="flex justify-center items-center md:items-start flex-initial">
        <img src= {pinDetail.image && urlFor(pinDetail.image).url()} alt="Pin" className="rounded-t-3xl rounded-b-lg" />
      </div>
      <div className="w-full p-5 flex-1 xl:min-w-620">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <a href={`${pinDetail.image?.asset?.url}?dl=`} download onClick={(e)=>e.stopPropagation()} className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none">
              <MdDownloadForOffline />
            </a>
          </div>
          <a href={pinDetail.destination} target="_blank" rel="noreferrer">
            {pinDetail.destination}
          </a>
        </div>
        <div>
          <h1 className="text-4xl font-bold break-words mt-3">{pinDetail.title}</h1>
          <p className="mt-3">{pinDetail.about}</p>
        </div>
        <Link to={`/user-profile/${pinDetail.postedBy?._id}`} className="flex gap-2 mt-2 items-center bg-white rounded-lg">
          <img src={pinDetail.postedBy?.image} alt="User profile" className="w-8 h-8 rounded-full object-cover" />
          <p className="font-semibold capitalize">{pinDetail.postedBy?.username}</p>
        </Link>
        <h2 className="mt-5 text-2xl">Comments</h2>
        <div className="max-h-370 overflow-y-auto">
          {pinDetail?.comments?.map((comment, i) => (
            <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={i}>
              <img src={comment.postedBy.image} alt="User profile" className="w-10 h-10 rounded-full cursor-pointer" />
              <div className="flex flex-col">
                <p className="font-bold">{comment.postedBy.username}</p>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap mt-6 gap-3">
          <Link to={`/user-profile/${pinDetail.postedBy?._id}`}>
            <img src={pinDetail.postedBy?.image} alt="User profile" className="w-10 h-10 rounded-full cursor-pointer" />
          </Link>
          <input type="text" placeholder="Add a comment" value={comment} onChange={(e) => setComment(e.target.value)} className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"/>
          <button onClick={addComment} type="button" className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none">
            {addingComment ? 'Posting the comment...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
    {pins?.length > 0 ? (
      <>
        <h2 className="text-center font-bold text-2x mt-8 mb-4">More like this:</h2>
        <MasonryLayout pins={pins} />
      </>
      ) : (
        <Spinner message="Loading more pins..." />
      )}
  </>
  )
}

export default PinDetail
