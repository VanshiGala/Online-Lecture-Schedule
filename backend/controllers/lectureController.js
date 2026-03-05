// import Lecture from "../models/Lecture.js";

// export const scheduleLecture = async (req, res) => {
//   try {

//     const { courseId, instructorId, batchName, date, startTime, endTime } = req.body;

//     // Check clash
//     const clash = await Lecture.findOne({
//       date,
//       instructor: instructorId,
//       $or: [
//         {
//           startTime: { $lt: endTime },
//           endTime: { $gt: startTime }
//         }
//       ]
//     });

//     if (clash) {
//       return res.status(400).json({
//         message: "Lecture schedule clash detected"
//       });
//     }

//     const lecture = new Lecture({
//       course: courseId,
//       instructor: instructorId,
//       batchName,
//       date,
//       startTime,
//       endTime
//     });

//     await lecture.save();

//     res.json(lecture);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
import Lecture from "../models/Lecture.js";

// export const scheduleLecture = async (req, res) => {
//   try {

//     const { courseId, instructorId, date,batch } = req.body;

//     // const clash = await Lecture.findOne({
//     //   instructor: instructorId,
//     //   date: date
//     // });
//     const start = new Date(date);
// start.setHours(0,0,0,0);

// const end = new Date(date);
// end.setHours(23,59,59,999);

// const clash = await Lecture.findOne({
//   instructor: instructorId,
//   date: { $gte: start, $lte: end }
// });

//     if (clash) {
//       return res.status(400).json({
//         message: "Instructor already has lecture"
//       });
//     }

//     const lecture = new Lecture({
//       course: courseId,
//       instructor: instructorId,
//       date,
//       batchName:batch
//     });

//     await lecture.save();

//     res.json(lecture);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const scheduleLecture = async (req, res) => {
  try {
    const { courseId, instructorId, date, batch } = req.body;

    console.log("courseId:", courseId);
    console.log("instructorId:", instructorId);
    console.log("date:", date);

    const startOfDay = new Date(date);
    startOfDay.setHours(0,0,0,0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23,59,59,999);

    const clash = await Lecture.findOne({
      instructor: instructorId,
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    console.log("clash result:", clash);
    
    if (clash) {
      return res.status(400).json({
        message: "Instructor already has lecture on this date"
      });
    }

    const lecture = new Lecture({
      course: courseId,
      instructor: instructorId,
      date,
      batchName: batch
    });

    await lecture.save();

    res.json(lecture);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyLectures = async (req, res) => {
  try {

    const lectures = await Lecture.find({
      instructor: req.user.id
    }).populate("course");

    res.json(lectures);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};