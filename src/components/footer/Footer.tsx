import {GithubLogo, LinkedinLogo } from '@phosphor-icons/react'

function Footer() {
 
  let data = new Date().getFullYear()

  return (
    <>
        <div className="flex justify-center bg-green-700 text-white">
          <div className="container flex flex-col items-center py-4">
            <p className='text-xl font-bold'>Farmacia - Generation | Copyright: {data}</p>
            <p className='text-lg'>Acesse nossas redes sociais</p>
            <div className='flex gap-2'>
            <a href="https://github.com/antonioviniciusvb/frontend-react-farmacia.git" target='_blank'><GithubLogo size={48} weight='bold'/></a>
            <a href="https://www.linkedin.com/in/antoniovvbandeira" target='_blank'><LinkedinLogo size={48} weight='bold' /></a>
            </div>
          </div>
        </div>
      </>
  )
}

export default Footer