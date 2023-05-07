import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../client.js';
import { feedQuery, searchQuery } from '../utils/data.js';
import MasonryLayout from './layouts/MasonryLayout';
import Spinner from './layouts/Spinner';

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    if(categoryId){
      const query = searchQuery(categoryId);

      client.fetch(query)
        .then((data) => {
          setPins(data);
          setLoading(false);
        });
    } else {
      client.fetch(feedQuery)
        .then((data) => {
          setPins(data);
          setLoading(false);
        });
    }
  }, [categoryId]);

  if(loading) return <Spinner message="Wait a little to show you something amazing!" />
  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}

export default Feed
