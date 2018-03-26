import { SafeProcessor } from 'solid-pipelines'
import { CourseParserArguments } from './courseParserArguments'

export abstract class ParseCourseProcessor extends SafeProcessor<CourseParserArguments> {
}