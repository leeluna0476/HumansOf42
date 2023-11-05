import Modal from "@/components/modal/Modal";
import { photos } from "@/images";
import { interviews } from "@/interview";
import { interview_contents } from "@/interview_json";
import Image from "next/image";
import React from "react";

export function generateStaticParams() {
  return interviews.map((interview) => {
    const id_string = interview.id.toString();
    return { id: id_string };
  });
}

export default function InterviewModalPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const interview_meta = interviews.find((i) => i.id === Number(id));
  const photo = photos.find((i) => i.id === Number(id));
  const interview = interview_contents.find((i) => i.id === Number(id));

  if (
    interview_meta === undefined ||
    photo === undefined ||
    interview === undefined
  ) {
    return <>Page not found</>;
  }

  return (
    <Modal>
      <div className="relative w-11/12">
        <h1 className="py-3 text-2xl font-bold flex justify-center w-full">
          {interview_meta.title}
        </h1>
        <h1 className="text-lg w-full flex justify-center p-2">
          {interview_meta.subtitle}
        </h1>
        <h1 className="p-2 text-sm w-full flex justify-center">
          {interview_meta.date.toISOString().slice(0, 10)}
        </h1>
        {photo.main !== undefined && (
          <Image
            alt={`Photo of ${interview_meta.interviewee}`}
            src={photo.main}
            className="py-16 w-full object-cover aspect-auto col-span-2"
          />
        )}
        {interview.content.map((paragraph) => {
          if (paragraph.text !== undefined) {
            return (
              <div className="py-3" key={id}>
                {paragraph.text}
              </div>
            );
          } else if (paragraph.speaker !== undefined) {
            return <div key={id}>{paragraph.speaker}</div>;
          } else if (paragraph.imagePath !== undefined) {
            return <div key={id}>{paragraph.imagePath}</div>;
          }
        })}

        <StaffNameBox>interviewer {interview_meta.interviewer}</StaffNameBox>
        <StaffNameBox>photographer {interview_meta.photographer}</StaffNameBox>
      </div>
    </Modal>
  );
}

export function StaffNameBox({ children }: React.PropsWithChildren) {
  return (
    <h3 className="flex justify-end relative w-full italic font-extrabold">
      {children}
    </h3>
  );
}
