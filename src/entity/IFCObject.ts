import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class IFCObject {
    @PrimaryColumn()
    oid: number;
    @Column({nullable: true})
    ifcId: string;
    @Column({nullable: true})
    name: string;
    @Column({nullable: true})
    SectionNature: string;
    @Column({nullable: true})
    sectionAnnexePiece: string;
    @Column({nullable: true})
    sectionAppartement: string;
    @Column({nullable: true})
    sectionBatiment: string;
    @Column({nullable: true})
    sectionEtage: string;
    @Column({nullable: true})
    sectionPiece: string;
    @Column({nullable: true})
    calque: string;
    @Column({
        type: "json"
    })
    properties: object;
    constructor(oid: number,
                ifcId: string,
                name: string,
                SectionNature: string,
                sectionAnnexePiece: string,
                sectionAppartement: string,
                sectionBatiment: string,
                sectionEtage: string,
                sectionPiece: string,
                calque: string,
                properties: object) {
        this.properties = properties;
        this.ifcId = ifcId;
        this.oid = oid;
        this.sectionPiece = sectionPiece;
        this.SectionNature = SectionNature;
        this.sectionEtage = sectionEtage;
        this.sectionBatiment = sectionBatiment;
        this.sectionAppartement = sectionAppartement;
        this.name = name;
        this.calque = calque;
        this.sectionAnnexePiece = sectionAnnexePiece;
    }
}
