"user client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { DialogClose } from '@radix-ui/react-dialog'
import { ArrowRight, Loader2 } from 'lucide-react'
import axios from 'axios'
import DoctorAgentCard, { doctorAgent } from './DoctorAgentCard'
import SuggestedDoctorsCard from './SuggestedDoctorsCard'
import { useRouter } from 'next/router'

function AddNewSessionDialog() {
    const [note, setNote] = useState<String>();
    const [loading, setLoading] = useState(false)
    const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>();
    const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>()
    const router = useRouter();


    const onStartConsultation = async () => {
        setLoading(true);
        const result = await axios.post('/api/session-chat', {
            notes: note,
            selectedDoctor: selectedDoctor
        });
        console.log(result.data)
        if (result.data?.sessionId) {
            console.log(result.data.sessionId)
            router.push('/dashboard/medical-agent/'+result.data.sessionId)
        }
        setLoading(false)
    }

    const OnClickNext = async () => {
        setLoading(true)
        const result = await axios.post("/api/suggest-doctors", {
            notes: note
        })
        console.log(result.data)
        setSuggestedDoctors(result.data)
        setLoading(false);
    }


    return (
        <Dialog>
            <DialogTrigger>
                <Button className='mt-3'>+ Start A Consultaion</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add basic details</DialogTitle>
                    <DialogDescription asChild>

                        {!suggestedDoctors ? <div>
                            <h2>Add Symptoms or Any other Details</h2>
                            <Textarea placeholder='Add Details here...' className='h-[250px]'
                                onChange={(e) => setNote(e.target.value)} />
                        </div> :
                            <div>
                                <h2>Select Doctor</h2>
                                <div className='grid grid-cols-3 gap-5'>
                                    {/*suggested doctor*/}
                                    {suggestedDoctors.map((doctor, index) => (
                                        <SuggestedDoctorsCard doctorAgent={doctor} key={index}
                                            setSelectedDoctor={() => setSelectedDoctor(doctor)}
                                            //@ts-ignore
                                            selectedDoctor={selectedDoctor}/>
                                    ))}
                                </div>
                            </div>
                        }
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button variant={'outline'}>Cancel</Button>
                    </DialogClose>
                    {!suggestedDoctors ? <Button disabled={!note || loading} onClick={OnClickNext}>

                        Next {loading ? <Loader2 className='animate-spin' /> : <ArrowRight />}</Button> :
                        <Button disabled={ loading || !selectedDoctor} onClick={() => onStartConsultation()}>
                            Start Consultaion
                            {loading ? <Loader2 className='animate-spin' /> : <ArrowRight />}
                        </Button>}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddNewSessionDialog