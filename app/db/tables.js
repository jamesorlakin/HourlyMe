import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm/browser'
import moment from 'moment'

@Entity('organisation')
export class Organisation {
  /** @type {number} */
  @PrimaryGeneratedColumn()
  id = undefined

  /** @type {string} */
  @Column('varchar')
  name = undefined

  /** @type {string} */
  @Column('varchar')
  colour = undefined

  /** @type {string} */
  @Column('varchar')
  telephone = undefined

  /** @type {string} */
  @Column('text', { nullable: true })
  invoiceTemplate = undefined

  /** @type {Hours[]} */
  @OneToMany(() => Hours, hours => hours.organisation)
  hours = undefined
}

@Entity('hours')
export class Hours {
  constructor () {
    this.calculatePaidHours = this.calculatePaidHours.bind(this)
    this.calculatePayment = this.calculatePayment.bind(this)
  }

  /** @type {number} */
  @PrimaryGeneratedColumn()
  id = undefined

  /** @type {string} */
  @Column('varchar')
  workDescription = undefined

  /** @type {Date} */
  @Column('datetime')
  startTime = undefined

  /** @type {Date} */
  @Column('datetime')
  endTime = undefined

  /** @type {number} */
  @Column('double')
  hourlyRate = undefined

  /** @type {number} */
  @Column('double')
  hoursUnpaid = undefined

  /** @type {boolean} */
  @Column('boolean')
  isPaid = false

  /** @type {Organisation} */
  @ManyToOne(() => Organisation, organisation => organisation.hours)
  organisation = undefined

  calculatePaidHours () {
    var hours = moment(this.endTime).diff(this.startTime, 'hours', true)
    return hours - this.hoursUnpaid
  }

  calculatePayment () {
    var paidHours = this.calculatePaidHours()
    return paidHours * this.hourlyRate
  }
}

@Entity('invoice')
export class Invoice {
  /** @type {number} */
  @PrimaryGeneratedColumn()
  id = undefined

  /** @type {string} @description 'Base 64' */
  @Column('text')
  exportedDocument = undefined

  /** @type {Date} */
  @Column('datetime')
  exportedDate = undefined
}
