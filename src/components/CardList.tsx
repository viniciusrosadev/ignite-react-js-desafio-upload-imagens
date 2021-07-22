import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { onOpen, isOpen, onClose } = useDisclosure();

  const [selectedUrlImage, setSelectedUrlImage] = useState('')

  function viewImage(url: string) {
    setSelectedUrlImage(url)
    onOpen()
  }

  return (
    <>
      <SimpleGrid columns={3} spacing="40px">
        {cards.map((card, index) => {
          return <Card key={index} data={card} viewImage={viewImage} />
        })}
      </SimpleGrid>

      <ModalViewImage isOpen={isOpen} imgUrl={selectedUrlImage} onClose={onClose} />
    </>
  );
}
