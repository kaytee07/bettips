"use client"
import HomeCard from "./HomeCard"


const MeetingTypeList = () => {
    const { toast } = useToast();
    const router = useRouter()
    const [meetingState, setMeetingState] = 
    useState<'isScheduleMeeting' | 'isJoiningMeeting' |
    'isInstantMeeting' | undefined>(); 
    const { user } = useUser();
    const client = useStreamVideoClient();
    const [callValues, setCallValues] = useState({
      dateTime: new Date(),
      description: '',
      link: ""
    });
    const [callDetails, setCallDetails] = useState<Call>()

    const createMeeting = async () => {
      if(!user || !client) return
      try {
        if(!callValues.dateTime){
          toast({ title: "Please select a date and time" });
        }

        const id = crypto.randomUUID();
        const call = client.call('default', id);

        if(!call) throw new Error('Failed to create call');

        const startsAt = callValues.dateTime.toISOString() ||
        new Date(Date.now()).toISOString();
        const description = callValues.description || 'Instant Meeting';
        
        await call.getOrCreate({
          data: {
            starts_at: startsAt,
            custom: {
              description
            }
          }
        })

        setCallDetails(call)

        if(!callValues.description){
          router.push(`/meeting/${call.id}`)
        }

        toast({title: "Meeting created"});
      } catch (error) {
        console.log(error);
        toast({
          title: "Failed to create meeting",
          description: "Friday, February 10, 2023 at 5:57 PM",
        })
      }
    };

  return (
    <section className="grid grid-cols-1 gap-5 
     md:grid-cols-2 lg:grid-cols-4">
       <HomeCard 
            icon="/icons/add-meeting.svg"
            title="New Meeting"
            description="start an instant meeting"
            bgColor="bg-orange-1"
            handleClick={() => setMeetingState('isInstantMeeting')}
        />
       <HomeCard 
            icon="/icons/join-meeting.svg"
            title="Join Meeting"
            description="start an instant meeting"
            bgColor="bg-blue-1"
            handleClick={() => setMeetingState('isJoiningMeeting')}
        />
       <HomeCard 
            icon="/icons/schedule.svg"
            title="Schedule Meeting"
            description="Plan your meeting"
            bgColor="bg-purple-1"
            handleClick={() => setMeetingState('isScheduleMeeting')}
        />
       <HomeCard 
            icon="/icons/recordings.svg"
            title="View Recordings"
            description="Meeting Recordings"
            bgColor="bg-yellow-1"
            handleClick = {() => router.push('/recordings')}
        />

        <MeetingModal
            isOpen = {meetingState === "isInstantMeeting"}
            onClose={() => setMeetingState(undefined)}
            className="text-center"
            buttonText="Start Meeting"
            handleClick={createMeeting}
            title="Start an instant Meeting"
        />

    </section>
  )
}

export default MeetingTypeList