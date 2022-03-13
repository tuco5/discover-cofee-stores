import { useRouter } from 'next/router';
import Link from 'next/link';

const CoffeeStore = (props) => {
  const router = useRouter();
  return (
    <div className='container'>
      Coffe Store Page {router.query.id}
      <Link href='/'>
        <a>Back to home</a>
      </Link>
    </div>
  );
};

export default CoffeeStore;
