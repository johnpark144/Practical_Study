export default function Head() { // nextjs13에선 Head가 예약어로 되있어서 head역할하게함
  return (
    <>
      <title>Meta Messenger</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
    </>
  )
}
