import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports'

import SearchPanel from '../searchPanel/SearchPanel'
import PageNavigation from '../pageNavigation/PageNavigation'
import VotingImage from './votingImage/VotingImage'
import VotingLog from './votingLog/VotingLog'
import Spinner from '../spinner'

import { fetchPhoto, reset } from './vSlice'

import './votes.scss'

const Votes = () => {
  const dispatch = useDispatch()
  const isPhotoLoaded = useSelector(state => state.vSlice.photoStatus)

  useEffect(() => {
    dispatch(reset())
    dispatch(fetchPhoto())
    // eslint-disable-next-line
  }, [])

  return (
    <main>
      <SearchPanel />
      <section>
        <PageNavigation />
        <div className='scroll-container'>
          {isPhotoLoaded === 'loaded' ? 
            <>
              <VotingImage />
              <VotingLog />
            </> 
          : 
            <Spinner />
          }
        </div>
      </section>
    </main>
  );
}

export default Votes;