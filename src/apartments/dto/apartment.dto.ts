import { ApiProperty } from '@nestjs/swagger';

class ApartmentPricing {
  @ApiProperty({
    example: '2be17879-e24f-5520-9edc-b2b4c0f54cf8',
  })
  id: string;

  @ApiProperty({
    example: '1c3f0e2e-c16f-5f04-acba-6e0a670fcf4e',
  })
  apartmentId: string;

  @ApiProperty({ example: 'DAILY' })
  duration: DURATION_OF_RENT;

  @ApiProperty({ example: 30000 })
  rent: number;

  @ApiProperty({ example: 5000 })
  serviceCharge: number;

  @ApiProperty({ example: 1000 })
  cautionFee: number;

  @ApiProperty({ example: 1200 })
  agreementFee: number;

  @ApiProperty({ example: 37200 })
  total: number;
}

class LocationType {
  @ApiProperty({
    example: '6644290a-1914-56be-b041-c0ac5e4631e0',
  })
  id: string;

  @ApiProperty({
    example: '7ae51d1d-7d93-5957-9fbd-6025d4e04427',
  })
  apartmentId: string;

  @ApiProperty({ example: '3957 Toni Trace' })
  approximate: string;

  @ApiProperty({ example: '93283 Wilderman Point' })
  precised: string;
}

class ApartmentBookingOptions {
  @ApiProperty({
    example: 'a1ac8cf9-9e5a-5f08-9908-300d9d02ff54',
  })
  id: string;

  @ApiProperty({
    example: 'a8be44da-1259-5bbb-abd1-c4fd7bbb57d7',
  })
  apartmentId: string;

  @ApiProperty({ example: false })
  installment: boolean;

  @ApiProperty({ example: false })
  selfCheckIn: boolean;
}

class Amenities {
  @ApiProperty({
    example: 'c7e43dcc-b725-5067-9a7a-c1eb77ee2d36',
  })
  id: string;

  @ApiProperty({
    example: '68f1a558-3683-5639-919c-fbfd00d3095b',
  })
  apartmentId: string;

  @ApiProperty({ example: false })
  bathtub: boolean;

  @ApiProperty({ example: false })
  fireSmokeDetector: boolean;

  @ApiProperty({ example: false })
  cctvCamera: boolean;

  @ApiProperty({ example: false })
  sittingBar: boolean;

  @ApiProperty({ example: false })
  acUnit: boolean;

  @ApiProperty({ example: false })
  doorBell: boolean;

  @ApiProperty({ example: false })
  laundry: boolean;

  @ApiProperty({ example: false })
  waterHeater: boolean;

  @ApiProperty({ example: false })
  outdoorGrill: boolean;

  @ApiProperty({ example: [] })
  others: string[];
}

class HouseRule {
  @ApiProperty({
    example: '453a16ff-bb9d-57a6-abe7-1ca4c0db4ec7',
  })
  id: string;

  @ApiProperty({
    example: '625d08c1-6caf-560f-9b08-8f995f856fb4',
  })
  apartmentId: string;

  @ApiProperty({ example: false })
  smoking: boolean;

  @ApiProperty({ example: false })
  illegalActivities: boolean;

  @ApiProperty({ example: '...' })
  gateClose: string;

  @ApiProperty({ example: '...' })
  inflammables: string;

  @ApiProperty({ example: '...' })
  landlordPermission: string;

  @ApiProperty({ example: '...' })
  keyLost: string;

  @ApiProperty({ example: 10 })
  loudMusic: number;

  @ApiProperty({ example: false })
  nightParties: boolean;
}

type APARTMENT_TAGS = 'DUPLEX' | 'ROOMS' | 'FLATS' | 'ESTATE' | 'HOSTELS';
type APARTMENT_TYPE =
  | 'ONE_BEDROOM'
  | 'SELF_CONTAINED'
  | 'TWO_BEDROOM_OR_MORE'
  | 'DUPLEX'
  | 'BUNGALOW'
  | 'MINI_FLAT'
  | 'PENTHOUSE';
type DURATION_OF_RENT =
  | 'DAILY'
  | 'WEEKLY'
  | 'MONTHLY'
  | 'QUATERLY'
  | 'SIX_MONTHS'
  | 'ANNUALLY';

export class ApartmentDto {
  @ApiProperty({ example: '2bb98aa0-319c-58bf-a648-d6f53d196708' })
  id: string;

  @ApiProperty({
    example: '8a101d43-c3c7-55f1-8311-a63561339189',
  })
  userId: string;

  @ApiProperty({ example: 'Brent Swanson' })
  name: string;

  @ApiProperty({ example: ['http://loremflickr.com/640/480/city'] })
  images: string[];

  @ApiProperty({ example: 'reginald-yost' })
  slug: string;

  @ApiProperty({ example: '3779 Brett Run' })
  location: LocationType;

  @ApiProperty({ type: ApartmentPricing })
  pricing: ApartmentPricing;

  @ApiProperty({ type: ApartmentBookingOptions })
  bookingOptions: ApartmentBookingOptions;

  @ApiProperty({ type: Amenities })
  amenities: Amenities;

  @ApiProperty({ type: HouseRule })
  houseRule: HouseRule;

  @ApiProperty({ example: ['DAILY'] })
  durationOfRent: DURATION_OF_RENT[];

  @ApiProperty({ example: 'DUPLEX' })
  apartmentType: APARTMENT_TYPE;

  @ApiProperty({ example: 1.2 })
  rating: number;

  @ApiProperty({ example: false })
  verified: boolean;

  @ApiProperty({ example: 1 })
  numberOfBedroom: number;

  @ApiProperty({ example: 1 })
  numberOfBathroom: number;

  @ApiProperty({
    example: 'Autem asperiores repudiandae voluptatem aut minus itaque rerum.',
  })
  description: string;

  @ApiProperty({ example: 'DUPLEX' })
  tags: APARTMENT_TAGS[];

  @ApiProperty({
    example: 'Wed Jul 19 2023 00:08:51 GMT+0100 (West Africa Standard Time)',
  })
  createdAt: Date;

  @ApiProperty({
    example: 'Sun Nov 19 2023 07:13:16 GMT+0100 (West Africa Standard Time)',
  })
  updatedAt: Date;
}
