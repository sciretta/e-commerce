import { useFetchUser } from '../src/hooks';

export default function Index() {
  const { error, user } = useFetchUser([]);
  console.log({ error, user });
  return <>index page</>;
}
