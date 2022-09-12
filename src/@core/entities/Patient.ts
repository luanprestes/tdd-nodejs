
interface PatientProps {
    name: string,
    email: string
}

export class Patient {
  constructor (private readonly props: PatientProps) {}

  get name (): string {
    return this.props.name
  }

  get email (): string {
    return this.props.email
  }
}
