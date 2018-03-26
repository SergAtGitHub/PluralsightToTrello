import { SafeProcessor } from 'solid-pipelines'
import { CourseParserArguments } from './CourseParserArguments'

export abstract class ParseCourseProcessor extends SafeProcessor<CourseParserArguments> {
}