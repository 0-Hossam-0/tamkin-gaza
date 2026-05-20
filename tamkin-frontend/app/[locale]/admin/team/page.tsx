import TeamMemberCreator from '@/components/creators/TeamMemberCreator';
import TeamTable from '@/components/tables/TeamTable';
import React from 'react';

const page = () => {
  return (
    <div className="flex flex-col gap-6">
      <TeamMemberCreator />
      <TeamTable />
    </div>
  )
}

export default page;