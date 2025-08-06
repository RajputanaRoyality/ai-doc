import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const { notes } = await req.json();
        const completion = await openai.chat.completions.create({
            model: "openrouter/horizon-beta",
            messages: [
                { role: "system", content: JSON.stringify(AIDoctorAgents) },
                { role: "user", content: "User Notes/Symptoms:" + notes + ",depends on user notes and syptoms, Please suggest list of doctors , Return object in JSON only" }
            ]
        })
        const rawResp = completion.choices[0].message;
        //@ts-ignore
        const Resp = rawResp && rawResp.content.trim().replace('```json').replace('```', '')
        const JSONResp = JSON.parse(Resp);
        return NextResponse.json(JSONResp)
    }
    catch (e) {
        return NextResponse.json(e);

    }
}