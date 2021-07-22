import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const fetchImages = ({ pageParam = null }) =>
    api.get('/api/images', {
      params: {
        after: pageParam ? pageParam : null
      }
    }).then(response => response.data);

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    fetchImages, {
    getNextPageParam: lastPage => lastPage.after ?? null,
  }
    // TODO GET AND RETURN NEXT PAGE PARAM
  );

  const formattedData = useMemo(() => {
    if (!isLoading) {
      return data.pages.flatMap(page => page.data)
    }
  }, [data]);

  if (isLoading === true) {
    return <Loading />
  }

  if (isError === true) {
    return <Error />
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button mt="4" onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
